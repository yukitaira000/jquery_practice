$(function(){
  // ナビの項目をクリックした時に
  $('.nav li').on('click',function(){
    // ナビのクリックされたindex番号をthisに追加
    var index = $('.nav li').index(this);
    // .description liにis-hiddenを追加する
    // 追加することで下記の操作で削除されたクラスを追加し非表示にする。
    $('.description li').addClass('is-hidden');
    //indexにクリックされたindex番号が取得され,クリックされたindex番号のis-hiddenクラスを削除し表示する。
    $('.description li').eq(index).removeClass('is-hidden');
  });
});