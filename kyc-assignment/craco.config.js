import React from 'react';
import { ConfigProvider } from 'antd';

export default () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
      },
    }}
  >
    <MyApp />
  </ConfigProvider>
);