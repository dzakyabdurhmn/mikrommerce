"use client";
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from "@ant-design/pro-components";
import { Space, Tabs, message, theme } from "antd";
import type { CSSProperties } from "react";
import { useState } from "react";

type LoginType = "phone" | "account";

export default () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>("phone");

  const iconStyles: CSSProperties = {
    marginInlineStart: "16px",
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
  };

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="Github"
          subTitle="Mikrommerce for Indonesia"
          // actions={
          //   <Space>
          //     Atau masuk menggunakan
          //     <AlipayCircleOutlined style={iconStyles} />
          //     <TaobaoCircleOutlined style={iconStyles} />
          //     <WeiboCircleOutlined style={iconStyles} />
          //   </Space>
          // }
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={"account"} tab={"Masuk"} />
            <Tabs.TabPane key={"phone"} tab={"Daftar"} />
          </Tabs>
          {loginType === "account" && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined className={"prefixIcon"} />,
                }}
                placeholder={"Nama"}
                rules={[
                  {
                    required: true,
                    message: "Silahkan masukan nama pengguna",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className={"prefixIcon"} />,
                  strengthText:
                    "Password should contain numbers, letters and special characters, at least 8 characters long.",

                  statusRender: (value) => {
                    const getStatus = () => {
                      if (value && value.length > 12) {
                        return "ok";
                      }
                      if (value && value.length > 6) {
                        return "pass";
                      }
                      return "poor";
                    };
                    const status = getStatus();
                    if (status === "pass") {
                      return (
                        <div style={{ color: token.colorWarning }}>
                          Kekuatan: sedang
                        </div>
                      );
                    }
                    if (status === "ok") {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          Kekuatan: Kuat
                        </div>
                      );
                    }
                    return (
                      <div style={{ color: token.colorError }}>
                        Kekuatan: lemah
                      </div>
                    );
                  },
                }}
                placeholder={"Password"}
                rules={[
                  {
                    required: true,
                    message: "Silahkan masukan kata sandi anda",
                  },
                ]}
              />
            </>
          )}
          {loginType === "phone" && (
            <>
              <ProFormText
                fieldProps={{
                  size: "large",
                  prefix: <MobileOutlined className={"prefixIcon"} />,
                }}
                name="mobile"
                placeholder={"Nomor telpon"}
                rules={[
                  {
                    required: true,
                    message: "Harap masukan nomor telpon",
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: "Nomor telepon salah!",
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className={"prefixIcon"} />,
                }}
                captchaProps={{
                  size: "large",
                }}
                placeholder={"Kode verifikasi"}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${"kirim kode verifikasi"}`;
                  }
                  return "kirim kode verifikasi";
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: "Harap masukan kode verifikasi",
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success(
                    "Berhasil mendapatkan kode verifikasi : 1234"
                  );
                }}
              />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              Masuk otomatis
            </ProFormCheckbox>
            <a
              style={{
                float: "right",
              }}
            >
              Lupa kata sandi?
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
