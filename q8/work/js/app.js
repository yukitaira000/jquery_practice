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

  // ページの初期値
  $('.search-btn').on('click', function(){
    var pageCount = 1;
    const searchWord = $('#search-input').val();
    if(searchWord === searchWord){
      pageCount = +1;
    } else {
      $('.lists').empty();
      pageCount = 1;
    }

    function displayResult(searchWord){
      $('.message').remove();
      if (searchWord[0].items){
        $.each(searchWord[0].items, function(status, books){
          var status = '<li class = "list-item"><div class="list-inner"><p>タイトル：' + ((books.title ? books.title : 'タイトル不明') + '</p><p>作者：') + ((books['dc:creator'] ? books['dc:creator'] : '作者不明') + '</p><p>出版社：' + ((books['dc:publisher'] ? books['dc:publisher'] : '出版社不明') + '</p><a href= "') + ((books.link['@id']) + 'target = "_blank">書籍情報</a></div></li>'));
          $('.lists').prepend(status);
          func(searchResult);
        })
      }else {
        // .messageクラスを削除
        $('.message').remove();
        // .listsクラスの子要素を削除
        $('.lists').empty();
        // 検索結果がなかったとメッセージを表示
        $('.lists').before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索して下さい。</div>');
      }
    }
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
      })
  })

  // リセットボタンを押下時
  $('.reset-btn').on('click', function(){
    $('.lists').empty();
    $('.message').remove();
    $('#search-input').val("");
  })
})

// ○質問
// 以前にも質問をさせていただいたのですが、うまく実装が出来ないため、質問をさせていただきます。

// 1.前回の質問時に「HTMLにコメントしていたのはこれを使うと言う意味ではなく、DOMの操作で入った時はこんなイメージと言う意味」と返答いただいていたのですがapp.jpに元々記載されているajaxの表記はあくまでも参考にするという意味でしょか？

// 2.同じキーワードで検索した時に毎回同じ検索結果しか検出されないのはdisplayResult(result)で受け取ってる内容が不十分だからでしょうか？
// または検索結果を次の候補を表示するという記述をする必要があるのでしょうか？

// 3.ajaxの記述の仕方について
// 通信成功時に取得するデータは条件分岐が必要とあるのですが、通信成功時の分岐として
// ・検索結果を表示する
// ・検索結果がなかった際は「検索結果がない」というようなメッセージを表示。
// 通信失敗時には
// ・「通信失敗した」という内容のメッセージを表示するという捉え方でいいのでしょうか？

　//一度の返答で理解できず申し訳ありません。もし可能であれば15分ほどお時間いただいて実装のコツであったりポイントを教えていただくことはできないでしょうか？