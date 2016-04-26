var fs = require('fs')

module.exports = {
  dateConv: function(date) {
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
      'December'
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
  },
  
  getModifiedDate: function(path) {
    var stats = fs.statSync(path) 
    var dateArr = stats.mtime.toString().split(' ')
    var date = dateArr[2] + " " + dateArr[1]
    return date
  },
  
  getNavigation: function() {
    var res = 
    `
      <table>
        <tbody>
          <tr>
            <td>
              <i class="fa fa-home"></i>
            </td>
            <td>
              <a href="/">home</a>
            </td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-comment"></i>
            </td>
            <td>
              <a href="http://blog.j1.io/">blog</a>
            </td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-align-left"></i>
            </td>
            <td>
              <a href="/projects">projects</a>
            </td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-briefcase"></i>
            </td>
            <td>
              <a href="/hireme">hire me</a>
            </td>
          </tr>
        </tbody>
      </table>
    `
    return res
  }
}