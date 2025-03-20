import axios from 'axios';

const api = axios.create({
  baseURL: 'http://20.244.56.144/test',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDc1NjY1LCJpYXQiOjE3NDI0NzUzNjUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjdiZjc2ODAwLTUxOTItNDYzNC04ZDgwLTU3MTljMzExNTIyMSIsInN1YiI6InJ5Nzg5N0Bzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiU1JNIElTVCBLVFIiLCJjbGllbnRJRCI6IjdiZjc2ODAwLTUxOTItNDYzNC04ZDgwLTU3MTljMzExNTIyMSIsImNsaWVudFNlY3JldCI6Ik14QmNpWFZCcVRBVEpTTmEiLCJvd25lck5hbWUiOiJSYWtzaGl0IFlhZGF2Iiwib3duZXJFbWFpbCI6InJ5Nzg5N0Bzcm1pc3QuZWR1LmluIiwicm9sbE5vIjoiUkEyMjExMDMzMDEwMDM4In0.upfSme81-qIsYF3IsyCkRHkSJsoXxFwBKeTgAQO8tEc',
    'Client-ID': '7bf76800-5192-4634-8d80-5719c3115221'
  }
});

export default api;