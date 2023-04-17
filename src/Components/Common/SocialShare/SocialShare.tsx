import React from "react";
import ButtonCommon from "../Button/ButtonCustom";
import toaster from "../Toast";
import useCopyClipboard from "../../../hooks/useCopyToClipboard";
import "./SocialShare.scss";
import { Col } from "react-bootstrap";
import { CopyClip } from "../../../Assets/Images/Icons/SvgIcons";
import InputCustom from "../Inputs/InputCustom";
import CommonHeading from "../CommonHeading/CommonHeading";

export const SocialShare = ({ socialLinks, url }: any) => {
  const [setCopied] = useCopyClipboard();
  const copy = (data: any, message?: string) => {
    setCopied(data);
    if (message) toaster.success(message);
  };

  const socials = [
    {
      outlet: "LinkedIn",
      href: "https://www.linkedin.com/shareArticle?url=",
      class: "linkedin",
      label: "Share on LinkedIn",
      icon: "fa fa-linkedin",
    },
    {
      outlet: "Facebook",
      href: "https://www.facebook.com/sharer.php?u=",
      class: "facebook",
      label: "Share on Facebook",
      icon: "fa fa-facebook",
    },
    {
      outlet: "Twitter",
      href: "https://twitter.com/intent/tweet?url=",
      class: "twitter",
      label: "Share on Twitter",
      icon: "fa fa-twitter",
    },
    {
      outlet: "Email",
      href: "mailto:?subject=Look%20at%20this%20website&body=",
      class: "email",
      label: "Share via Email",
      icon: "fa fa-envelope",
    },
    {
      outlet: "SMS",
      href: "sms:?body=",
      class: "sms",
      label: "Share via SMS",
      icon: "fa fa-comments",
    },
    {
      outlet: "Whatsapp",
      href: "whatsapp://send?text=",
      class: "whatsapp",
      label: "Share via WhatsApp",
      icon: "fa fa-whatsapp",
    },
    {
      outlet: "Pinterest",
      href: "https://pinterest.com/pin/create/link/?url=",
      class: "pinterest",
      label: "Share via Pinterest",
      icon: "fa fa-pinterest",
    },
  ];

  return (
    <>
      <Col md={6}>
        <div className={"social-container"}>
          <CommonHeading heading="My Referral Link" />
          <div className="social-links">
            <div className="link-area">
              <ButtonCommon
                className="nobg"
                onClick={() => copy(url, "Url copied to clipboard")}
                onlyIcon={<CopyClip />}
              />
              <InputCustom readOnly value="https://antier/165135138431535…" />
            </div>
            <ul>
              <span>Share :</span>
              {socialLinks
                .map((item: any) => {
                  item = socials.find((itm) => itm.outlet === item) ?? "";
                  return item;
                })
                .map(
                  (item: any, key: any) =>
                    item.href && (
                      <li key={key}>
                        <a
                          href={item.href + url}
                          rel="noreferrer"
                          target="popup"
                          title={item.label}
                          className={item.class}
                          onClick={() =>
                            window.open(
                              window.location.origin,
                              "popup",
                              "width=600,height=600,scrollbars=no,resizable=no"
                            )
                          }
                        >
                          <i className={item.icon}></i>
                        </a>
                      </li>
                    )
                )}
            </ul>
          </div>
        </div>
      </Col>
    </>
  );
};
