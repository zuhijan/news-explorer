function today() {
  return new Date().toISOString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric'});
}

function weekAgo() {
  const timeInMilSecWeek = 7 * 24 * 3600 * 1000;
  return new Date((Date.now() - timeInMilSecWeek)).toISOString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric'});
}

function formatDate(date) {
  return new Date(date).toLocaleString("ru", { year: 'numeric', month: 'long', day: 'numeric'});
}

module.exports = {
  today,
  weekAgo,
  formatDate
};
