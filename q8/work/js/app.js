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


// 関数宣言
$(function(){
  // ページの初期値を1に指定
  var pageCount = 1;
  // 検索ボタンをクリック時に
  $('.search-btn').on('click', function(){
    // searchWordに検索ワードに入力された値を代入
    var searchWord = $('#search-input').val();
    // 検索ワードが同一のものが入力された場合、ページのカウントをそのまま増やし、表示を追加する。異なる検索ワードの場合はページを初期値に戻す
    searchWord === $('#search.input').val() ? pageCount = +1 : (pageCount = 1,$('.lists').empty());
    // ajaxのデータ取得先
    const settings = {
    url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
    method: "GET",
    }
    // .done時の処理
    function displayResult(searchWord){
      // messageクラスを削除
      $('.message').remove();
      // 検索ワードの結果が存在していた場合
      if (searchWord[0].items != null){
        // 検索結果内の繰り返し処理を指定
        // 関数booksの処理を記述
        $.each(searchWord[0].items, function(searchresult, books){
          // 変数statusにajaxで取得した情報である、タイトルや作者名、出版社の情報代入。
          var status = '<li class = "list-item"><div class="list-inner"><p>タイトル：' + ((books.title ? books.title : 'タイトル不明') + '</p><p>作者：') + ((books['dc:creator'] ? books['dc:creator'] : '作者不明') + '</p><p>出版社：' + ((books['dc:publisher'] ? books['dc:publisher'] : '出版社不明') + '</p><a href= "') + ((books.link['@id']) + 'target = "_blank">書籍情報</a></div></li>'));
          // 取得したあと.listsクラスの子要素の先頭に検索結果を追加していく。
          $('.lists').prepend(status);
        })
        // 検索結果がなかった場合
      }else {
        // .messageクラスを削除
        $('.message').remove();
        // .listsクラスの子要素を削除
        $('.lists').empty();
        // 検索結果がなかったとメッセージを表示
        $('.lists').before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索して下さい。</div>');
      }
    }
    // データが取得できなかった時の処理
    function displayError(errmessage){
      // .messageクラスを削除
      $('.message').remove();
      // 検索結果が入力なかったためエラーのメッセージを表示
      $('.lists').before('<div class="message">検索キーワードが有効ではありません。<br>1文字以上で検索して下さい。</div>');
    }
    // settingsにしてした情報を取得
    $.ajax(settings)
    // データ取得成功時の処理
    .done(function (response){
      // resultにajaxで取得した検索結果の情報を代入
      const result = response['@graph'];
      // 上記に書いた.done時の処理の関数を呼び出す。
      // resultに代入された値を取得
      displayResult(result);
    })
    // データ取得できなかった際の処理
    .fail(function(err){
      // 上記displayError関数を呼び出す。
      displayError(err);
    })
  })
  // リセットボタンをクリックした時
  $('.reset-btn').on('click', function(){
    // リストの子要素を削除する
    $('.lists').empty();
    // メッセージクラスがあった場合削除する
    $('.message').remove();
    // 検索ワードの内容を空欄にする
    $('#search-input').val("");
  })
})