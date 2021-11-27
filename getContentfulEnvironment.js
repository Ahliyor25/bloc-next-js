const contentfulManagement = require("contentful-management")

module.exports = function() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: 'CFPAT-xzNfjZrCk9V_BuUSgap4DxxRDSNTQM4KHk0xnbzkD0k',
  })

  return contentfulClient
    .getSpace('02sqkx1j5o2n')
    .then(space => space.getEnvironment('master'))
}