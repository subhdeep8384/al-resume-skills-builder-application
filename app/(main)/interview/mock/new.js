const axios = require('axios');
const FormData = require('form-data');
let data = new FormData();
data.append('ts', '1747986450005');
data.append('q', '[{"app_id":"412378670482","posts":"qQ2AW1siZmFsY286b2RzX3dlYl9iYXRjaCIseyJlIjoie1wiBRAgXCI6e1wiMjIzCQlEbXMudGltZV9zcGVudC5xYS5tCRgdFUhiaXRzLmpzX2luaXRpYWxpemVkCSQcblwiOjEsXCIBDzRudWxsfX19LFwiMjk2NgkgHGZlZWRfYWRzCQ4oZ2hsVGVzdFVCVC4BSgkVQkMABCxcLikAIGRvbmUuZmFsczIGAFo7AAV+CDcxNw3aMGVudGl0aWVzLmZmX2olEQAuJRUMbHVlXxnebF9uYXZpZ2F0aW9uLjQxMjM3ODY3MDQ4Mi4wLkMRSQB2IRsMbG9nZ2L5AAgsXCIJJmBpbmZvLnVwbG9hZF9tZXRob2QuYmFuemFpAUAwX2ltbWVkaWF0ZWx5XCWHTv8AHUlWOwARYCRwcm9jZXNzaW5nfk0ACZFivgAFv0YuATRiZF9wZGNfc2lnbmFsc7YeAQAyLhcCNh4BGdUNmPLJAGppAAn2SocBHGNyaXRpY2FsfjcBJc0ZrxU4EVqCgQEF+kZZASxnaGxfdGVzdF91YnS2VwEybgP+VwFuVwEyaQAFakbHAGFOfUkgYml0X2FycmF5/tMAFdNiwQH+SAP+SANeSAP0JgF9fX0iLCJyIjoxLCJkIjoiJF58QWNibTVLX2dGMlhYR1pVcllDWjZ3ekdOTm5tVlUyWkhhYnFWOHdFaHZmUnR5TkNYQXkzb0d4QzVKcVMweUY2a2c0bmo4WDJjazh0RTdoQkp1THR1NXBrdGMyc1RmXzh8ZmQuQWNaU3RvaXVwdzExZUszLWZGSEVyZVI0Sk9Gem9tNWUtUnhKYVhvdW54S1dMNmhpQnU3cEh0MXlGUWJXdU1rSjVYUTBqYjVKVnl5X0V1Q2VjN1RmNUNkdCIsInMiOiIydXVhdDA6ZmpkN2RsOjBkcXJ1dSIsInQiOjE3NDc5ODY0MjI3MjYuMiwiYiI6WzEsMTI4XX0sMTc0Nzk4NjQyMjcyNi4yOTk4LDAsMTY1M11d","user":"0","webSessionId":"2uuat0:fjd7dl:0dqruu","trigger":"falco:web_time_spent_bit_array","send_method":"ajax","compression":"snappy_base64","snappy_ms":1}]');

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://m.facebook.com/a/bz?fb_dtsg=NAftI2EYa0bWhspghXtHXnxb-fEKv2rUE3gGStLhdHrjq1w47rN6skw%3A0%3A0&jazoest=25112&lsd=AVoWO3uGDJs&__dyn=1Z3pawlE72fDg9ppoW5UdE4a2i5U4e0C86u7E39x60lW4o3Bw4Ewk9E4W0qa0FE6S082x60se2G0NE3mw5Uw64w8W0k-0n60h-0Lo6-0Co1kU1UU3jw&__csr=&__hsdp=&__hblp=&__req=4&__fmt=1&__a=AYlmr69da3Zi651Z4rhzXaMFNl0u42z87G1hFcwc1abCVv7vS1H4aYOgrGBLkxQV640qUTOraXwIEYAylfho9-cKfGT-of5oYVfSL6sD6Lor9w&__user=0',
  headers: { 
    'accept': '*/*', 
    'accept-language': 'en-US,en;q=0.9', 
    'origin': 'https://m.facebook.com', 
    'priority': 'u=1, i', 
    'referer': 'https://m.facebook.com/recover/code/?cuid=AYgpYvm4b2PizV_5gKzIUYFuLsuBEqIhCWq3PBpVg0kGmdmq1e0cSdSgh2a63nKjQv_SGJLtINfTJZhfpvZ7AALrVCjjUQi1Q_QExx8-ZsVOiV07GJotTT8dxe4rJ1Ud6nouMkZ2DelR2qZxHZ_D-ynOdRGWnKvih5qq8g7ja4FuWWj1jLsxxL_SUVDLvZdSkVSYWBfA4l_ClV3WGBi84vVIHtnvNlqgW1EmivCzOFQPni7KEoNpjy9JZYMe3iuz09wJLFzubDm2rlLxRV-J7ht0', 
    'sec-ch-prefers-color-scheme': 'dark', 
    'sec-ch-ua': '"Chromium";v="136", "Microsoft Edge";v="136", "Not.A/Brand";v="99"', 
    'sec-ch-ua-full-version-list': '"Chromium";v="136.0.7103.113", "Microsoft Edge";v="136.0.3240.76", "Not.A/Brand";v="99.0.0.0"', 
    'sec-ch-ua-mobile': '?1', 
    'sec-ch-ua-model': '"Nexus 5"', 
    'sec-ch-ua-platform': '"Android"', 
    'sec-ch-ua-platform-version': '"6.0"', 
    'sec-fetch-dest': 'empty', 
    'sec-fetch-mode': 'cors', 
    'sec-fetch-site': 'same-origin', 
    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36 Edg/136.0.0.0', 
    'x-asbd-id': '359341', 
    'x-fb-background-state': '1', 
    'x-fb-lsd': 'AVoWO3uGDJs', 
    'x-requested-with': 'XMLHttpRequest', 
    'x-response-format': 'JSONStream', 
    'Cookie': 'datr=xh4iZ5gpuKuaB-RjtH5K9XTa; ps_l=1; ps_n=1; sb=NXKwZ6vD7dEp_hTeO5kw-xdl; dpr=2; sfiu=AYiVjXpTNg-iTY2MuYYgL6NHHJjm3rM5engHiNDt8AxSxCZFtWRE2MH1G-CyaEGqsMuHTIblmfSHscsKuqC1cLHqQ3aJEykO6Qb_IJgdSCGzD0IcBIQy1o2bcKrmfxau9FktPCKzeoMzkDcQnYgRcQjwVboGkyWI8sYDat8vp1i1nxYRnUR-zkujy7_42H0eTLEgXt9HS5lFDhs8ohfe-JZ0K3-RN5OIlKHtJfgU20kuF3V-s83BDA-udnhCbdbo67Ro3b6cqCa7k4LbTl2Nzh6H; m_pixel_ratio=2; wd=853x903; fr=009kIOnuLtYdjY2mQ.AWfIamCDrXJFjb-KKFE2bqtoEBMFs52CY3vqGlC1irfbDQQZeu4.BnO2c0..AAA.0.0.BoMCgQ.AWe2mDztcvcXCiNxaV5_JiNDzNo', 
    ...data.getHeaders()
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
