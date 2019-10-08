
const googleTrends = require( 'google-trends-api' );

module.exports.gcf_interestByRegion = ( search_setting_in ) => {
  return googleTrends.interestByRegion( search_setting_in );
}

module.exports.gcf_interestOverTime = ( search_setting_in ) => {
  return googleTrends.interestOverTime( search_setting_in );
}

module.exports.gcf_relatedTopics = ( search_settings_in ) => {
  return googleTrends.relatedTopics( search_settings_in );
}

module.exports.helloworld = () => {
  console.log( 'helloworld' );
}
