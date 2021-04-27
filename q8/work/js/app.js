// API
// const settings = {
//   "url": `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
//   "method": "GET",
// }
// $.ajax(settings).done(function (response) {
//   const result = response['@graph'];
//   displayResult(result)
// }).fail(function (err) {
  //    displayError(err)
// })

$(function(){
  // 通信成功時の関数
  function displayResult(searchResult){
    // messageクラスの要素を削除
    $('.message').remove();
    // 検索結果が存在していれば
    if(searchResult[0].items != null){
      // 検索結果内の情報を取得
      $.each(searchResult[0].items, function(status, books){
        // statusにDOMの要素を代入
        // タイトル情報はbooks.titleに取得、取得できなかった場合はタイトル不明
        // 作者情報はbooks['dc:creator']で取得、取得できなかった場合は作者不明
        // 出版社はbooks['dc:publisher']で取得、取得できなかった場合は出版社不明
        // 書籍情報はbooks.link['@id']にリンク先として取得
        var status = '<li class="list-item"><div class="list-inner"><p>タイトル：' + ((books.title ? books.title : 'タイトル不明') + '</p><p>作者：') + ((books['dc:creator'] ? books['dc:creator'] : '作者不明') + '</p><p>出版社：' + ((books['dc:publisher'] ? books['dc:publisher'] : '出版社不明') + '</p><a href= "') + ((books.link['@id']) + 'target = "_blank">書籍情報</a></div></li>'));
        $('.lists').prepend(status);
      })
      // 検索結果が存在していない場合
    }else{
      $('.lists').before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索して下さい。</div>')
    }
  }
  // 通信失敗した場合
  function displayError(errMessage){
    // .listsクラスの子要素を削除
    $('.lists').empty();
    // .messageクラスを削除
    $('.message').remove();
    // エラーメッセージのステータスの値が0の場合
    // リクエストが許可されていない場合のメッセージ
    if(errMessage.status === 0){
      $('.lists').before('<div class="message">正常に通信できませんでした。<br>インターネットの接続の確認をしてください。</div>')
      // エラーメッセージが400と表示
      // 不正なリクエストとして処理された場合（文字入力が無い場合
      // や、URLなどが間違っている場合）に表示されるメッセージ
    }else if(errMessage.status === 400){
      $('.lists').before('<div class="message">検索キーワードが有効ではありません。<br>1文字以上で検索して下さい。</div>')
      // それ以外のエラー時のメッセージの表示
    }
    else{
      $('.lists').before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索して下さい。</div>')
    }
  }
  // ページの初期値は1
  var pageCount = 1, differentWord = "";
  // 検索ボタンをクリックしたとき
  $('.search-btn').on('click', function(){
    // searchWordに検索ワードに入力した値を代入
    var searchWord = $('#search-input').val();
    // searchWordの中身が異なる場合、ページ数を1に、.listsクラスの子要素を削除、検索ワードをsearchWordに代入する。
    // 同じ検索ワードの場合、ページを追加して表示
    searchWord !== differentWord ? (pageCount = 1,$('.lists').empty(), differentWord = searchWord) : pageCount++;
    // ajaxの読み込み
    const settings = {
      url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
      method: "GET",
    }
    $.ajax(settings).done(function (response) {
      const result = response['@graph'];
      displayResult(result)
      // console.log(result)
    })
    .fail(function (err) {
      displayError(err)
      // console.log(err);
    })
  })
  // リセットボタンを押下時
  $('.reset-btn').on('click', function(){
    // .listsの子要素を削除
    $('.lists').empty();
    // .messageクラスを削除
    $('.message').remove();
    // 検索ワードを空にする
    $('#search-input').val("");
  })
})

// 質問
// ○記述の仕方について
// 今回は成功時の関数、失敗時の関数を先に記述し、その後にajaxの処理を書くようにしましたが、この書き方でも間違いないでしょうか？

// ○成功時の条件文について
// 前回の質問時に条件文がsearchWord[0].items !=nullと指定していたのですが、今回はその件に関してです。
// 条件文に指定するのは検索結果の有無ではないのでしょうか？
// 検索結果の有無をコンソールで確認するとitemsの項目が有るか無いかの違いとopensearch:totalResultsの数が0か検索数が表示されているかという違いが有ることは見つけました。
// ・やったこととして
// ・検索結果が有るか無いかの判断としてitems > 0では検索がうまくできない。
// ・(searchResult[0].items).length > 0　でitemsの配列内の数値を有るか無しかの判断をしてしましたが、エラーが出てしまいうまくいきませんでした。
// ・opensearch:totalResultsが関係してきているかと思い、searchResult[opensearch:totalResults] > 0としてみましたがだめでした。

// itemsが表示が無いため、nullを使用するとうまくいくのですが、存在しないということでは無いということでしたので、現在の記述が違うことはわかったのですが、どのように条件を考えて、設定していくのかという点がわからず行き詰まっております。
// 初歩的なことで申し訳ないのですが、この条件分岐の条件の考え方、設定の仕方のコツは何か無いでしょうか？

// ○通信失敗時の処理について
// ・エラー時に、2つのエラーメッセージを確認することはできたので条件文を2つ設定し記述はしましたが、それ以外のエラー時が確認できませんでした。のでelseを書いた後の記述で悩んでおります。
// elseは書かなくても可とネットにて情報を確認したのですが、記述不要ということでも良いのでしょうか？それともエラーが発生しましたという内容の文を入れておくべきなのでしょうか？