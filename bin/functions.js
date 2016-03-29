module.exports = {
  dateConv: function(date) {
    "25 February 2016"
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    
    var arr = date.split(' ');
    var temp = arr[0]
    arr[0] = (months.indexOf(arr[1]) + 1).toString();
    arr[1] = temp;
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].length == 1)
        arr[i] = '0' + arr[i];
    }
    return arr.join('/');
  }
}