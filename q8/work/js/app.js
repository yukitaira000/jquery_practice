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
  // });
var pageCount = 1;
$(function(){
  // 検索ボタンをクリックした時に
  $('.search-btn').on('click', function(){
    // 検索ワードに入力されたワードをsearchWordに代入
    var searchWord = $('#search-input').val();
    // .messageクラスがあった場合、削除する(同じメッセージの表示が重複しないようにするため。)
    $('.message').empty();
    // 検索ワードに何も入力されていない時
    if($('#search-input').val("")){
      // listsクラスの前にdiv class="message"を追加しメッセージを表示する
      $('.lists').before('<div class="message">正常に通信できませんでした。<br>インターネットの接続の確認をしてください。</div>')}
    // 検索ワードに入力された言葉が同じだった場合、追加の検索結果を表示、異なる検索ワードだった場合、新しいページにし表示しなおす。
    searchWord !== searchWord ? (pageCount = 1, $('.lists').empty()): pageCount = +1;

    const settings = {
    url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
    method: "GET",
    }
    function result(){
      if(0 < searchWord){$('.list-item').prepend('<li class="link-item"><div class="list-inner"><p>タイトル：' + result.title + '</p><p>作者：' + result['dc:creator'] + '</p><p>出版社：' + result['dc:publisher'] + '</p><a href "' + result.link['@id'] + '" target="blank">書籍情報</a></div></li>')}else{
        $('lists').empty();
        $('lists').before('<div class ="message">検索結果が見つかりませんでした。<br>別のキーワードで検索して下さい。</div>')
      }
    }
    $.ajax(settings)
      .done(function (response) {
      const result = response['@graph'];
      displayResult(result);
      })
    })
      .fail(function (err) {
      displayError(err);
      if(searchWord === 0){
        $('.lists').before('<div class ="message">検索結果が見つかりませんでした。<br>別のキーワードで検索して下さい。</div>'
      )};
    });
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
  // resultに呼び出す関数を作る
  // 関数には分岐を作ること
  // .fail以降は起こりうるエラーに対して作る


  
  // 質問です。
  // 本の情報を取得する際にコールバック関数を使用すると思うのですが、ここが理解ができていないと思うので、APIからの情報を取得できていないのかと思います。
  // コールバック関数に関しての質問です。
  // displayResult(result)を実行し、function(response)に呼ばれた関数を受け取るという認識で間違い無いでしょうか？
  // ネットや本などの情報を調べてみましたが、それでもうまく情報が取得できないということは何か間違っているのでは無いかと思い、質問させていただきました。

  // 他の項目としては実装時にポイントに合うようにしていますが、間違いや修正が必要な箇所があれば教えていただきたいと思います。

  // よろしくお願い致します。