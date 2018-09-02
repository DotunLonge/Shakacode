exports.isExpired = function(date) {
  date = new Date(date).getTime();
  today = new Date().getTime();
  return today > date;
};

exports.genExpDate = function() {
  var now = new Date();
  now.setDate(now.getDate() + 14);
  return now;
};
