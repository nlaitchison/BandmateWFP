'use strict';

/*global App*/

App.controller('TypeAheadCtrl', function ($scope) {

  // instantiate the bloodhound suggestion engine
  var instruments = new Bloodhound({
    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.i); },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: [
      { i: 'Guitar' },
      { i: 'Electric Guitar' },
      { i: 'Acoustic Guitar' },
      { i: 'Bass Guitar' }
    ]
  });

  instruments.initialize();

  $scope.iDataset = {
    displayKey: 'i',
    source: instruments.ttAdapter()
  };

  $scope.selectedInstrument = null;

  $scope.array = ['keyboard'];

  // instantiate the bloodhound suggestion engine
  var numbers = new Bloodhound({
    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.num); },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: [
      { num: 'one' },
      { num: 'two' },
      { num: 'three' },
      { num: 'four' },
      { num: 'five' },
      { num: 'six' },
      { num: 'seven' },
      { num: 'eight' },
      { num: 'nine' },
      { num: 'ten' }
    ]
  });

  // initialize the bloodhound suggestion engine
  numbers.initialize();

  $scope.numbersDataset = {
    displayKey: 'num',
    source: numbers.ttAdapter()
  };

  $scope.addValue = function () {
    numbers.add({
      num: 'twenty'
    });
  };

  $scope.setValue = function () {
    $scope.selectedNumber = { num: 'seven' };
  };

  // Typeahead options object
  $scope.exampleOptions = {
    highlight: true
  };

  $scope.exampleOptionsNonEditable = {
    highlight: true,
    editable: false // the new feature
  };

});