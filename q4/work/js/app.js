$(function(){
  // ナビの項目をクリックした時に
  $('.nav li').on('click',function(){
    // ナビのクリックされたindex番号をthisに追加
    var index = $('.nav li').index(this);
    // .description liにis-hiddenを追加する
    // 追加することで下記の操作で削除されたクラスを追加することができる
    $('.description li').addClass('is-hidden');
    // .description liにクリックされたクリックされたインデックス番号が指定されるため、指定された.description liの.is-hiddenクラスを削除し、コンテンツ名を表示する。
    $('.description li').eq(index).removeClass('is-hidden');
  });
});