// API
// const settings = {
//   "url": `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
//   "method": "GET",
// }
// $.ajax(settings).done(function (response) {
//   const result = response['@graph'];
//   displayResult(result)
// }).fail(function (err) {
//   displayError(err)
// })

$(function(){
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
      console.log(result)
    })
    .fail(function (err) {
      displayError(err)
      // console.log(err);
    })
  })
  // 通信成功時の関数
  function displayResult(searchResult){
    // messageクラスの要素を削除
    $('.message').remove();
    // 検索結果があれば
    if(searchResult[0].items){
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
      // 検索結果が無かった場合
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
      $('.lists').before('<div class="message">予期せぬエラーが発生しました。<br>再度接続し直してください。</div>')
    }
  }
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