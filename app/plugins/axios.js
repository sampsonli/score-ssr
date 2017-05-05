import axios from 'axios'

let options = {}
// The server-side needs a full url to works
if (process.SERVER_BUILD) {
    options.baseURL = `http://ews.500.com`
}
options.baseURL = `http://ews.500.com`
export default axios.create(options)
