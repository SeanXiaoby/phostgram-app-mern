import React from "react";
import { BsGithub } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { SiNetlify, SiMongodb } from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";

const Footer = () => {
  console.log("Footer");
  return (
    <div className="footer">
      <h5>Powered by</h5>
      <div className="footer-icon-container">
        <a
          className="footer-icon-link"
          href="https://github.com/SeanXiaoby/ee547-23sp-final-project"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsGithub className="footer-icon" size={40} />
        </a>
        <a
          className="footer-icon-link"
          href="https://react.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaReact className="footer-icon" size={40} />
        </a>
        <a
          className="footer-icon-link"
          href="https://nodejs.org/en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DiNodejsSmall className="footer-icon" size={40} />
        </a>
        <a
          className="footer-icon-link"
          href="https://www.mongodb.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiMongodb className="footer-icon" size={40} />
        </a>
        <a
          className="footer-icon-link"
          href="https://www.netlify.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiNetlify className="footer-icon" size={40} />
        </a>
      </div>
      <div className="footer-rights-container">
        <h4 class="footer-rights">
          Copyrights © Boyang Xiao, Yuangfeng Li, Zhen Qian 2023 All rights
          reserved
        </h4>
      </div>
    </div>
  );
};

export default Footer;
