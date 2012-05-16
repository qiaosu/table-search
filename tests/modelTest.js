$(document).ready(function(){
  test('Klass', function(){
    ok(klass, 'Klass is run.');
  });

  test('Backbone.Events', function(){
    ok(Events, 'Backbone.Events is run.');
  });

  test('Model', function(){
    ok(window.Model, 'Model is exist.');

    var model = new window.Model({
      'phone': '13524110524',
      'email': 'test@126.com',
      'sex': 0
    });

    ok(model._id, 'This model\'s id is: '+model._id);

    equal(model.attrs.phone, '13524110524', 'model.attrs.phone is ok.');
    equal(model.has('name'), false, 'has method is ok.');
    equal(model.has('sex'), true, 'has method is ok.');
    equal(model.get('phone'), '13524110524', 'get method is ok.');
    equal(model.get('name'), undefined, 'get method is ok.');

    model.set({'email':'new@126.com'});
    equal(model.get('email'), 'new@126.com', 'set method is ok.');
  });

  test('SearchCore', function(){
    ok(window.SearchCore, 'SearchCore is exist.');

    window.searchCore = new window.SearchCore({
      'phone': '13524110524',
      'email': 'test@126.com',
      'sex': 0
    });

    ok(window.searchCore._id, 'This model\'s id is: '+window.searchCore._id);
    equal(window.searchCore.get('phone'), '13524110524', 'get method is ok.');

    window.searchCore.set({'phone': '110'});
    equal(window.searchCore.set({'phone': '110'}), false, 'validator running.');
    window.searchCore.set({'phone': '13333333333'});
    equal(window.searchCore.get('phone'), '13333333333', 'validator passed.');
  });
});