$(function(){
  // メニューの項目の上にマウスホバーされた時に
  $('.dropdwn li').on('mouseover', function(){
    // .dropdwn_menuをスライドダウンでメニュー内容を表示する。実行時にマウスホバーが終了した場合は動作をスライドダウンをやめる
    $(this).children('ul').stop().slideDown();
  }),
  // マウスホバーが終了した時は
  $('.dropdwn li').on('mouseout', function(){
    // 表示されたメニューはスライドアップしメニューを閉じる。
    // 動作中にホバーされた場合はスライドアップをやめる
    $(this).children('ul').stop().slideUp();
  });
});