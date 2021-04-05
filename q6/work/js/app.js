$(function(){
  // セレクトボタンの値が変更された時
  $('.select-box').on('change', function(){
    // .select-boxの値を取得しcategoryに代入
    var category = $(this).val();
    // .food-list liに登録された値を取得
    var foodList = $('.food-list li');
    // 全てを選択している時、カテゴリーを全て表示する
    'all' === category ? foodList.show():
    // 全てを選択していない場合、以下の処理をする。
    $.each(foodList, function(selectCategory, list){
      // 選択されたカテゴリーのcategory-typeの値を取得し、listNameに代入する。
      var listName = $(list).data('category-type');
      // .select-boxの値と上記で取得したカテゴリーの値が同じものを表示する。異なるものは表示しない。
      category === listName ? $(list).show(): $(list).hide()
    })
  })
})