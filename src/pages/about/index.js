import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
  worktimeline,
  skills,
  services,
} from "../../content_option";
import {
  FaPython,
  FaHtml5,
} from "react-icons/fa";
import {
  SiFlask,
  SiDjango,
  SiR,
  SiNodedotjs,
  SiReact,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiMysql,
  SiPowerbi,
  SiTableau,
  SiAmazonaws,
  SiMicrosoftexcel,
} from "react-icons/si";

// Icon mapping
const iconMap = {
  FaPython: FaPython,
  FaHtml5: FaHtml5,
  SiFlask: SiFlask,
  SiDjango: SiDjango,
  SiR: SiR,
  SiNodedotjs: SiNodedotjs,
  SiReact: SiReact,
  SiMongodb: SiMongodb,
  SiPostgresql: SiPostgresql,
  SiGit: SiGit,
  SiGithub: SiGithub,
  SiMysql: SiMysql,
  SiPowerbi: SiPowerbi,
  SiTableau: SiTableau,
  SiAmazonaws: SiAmazonaws,
  SiMicrosoftexcel: SiMicrosoftexcel,
};

export const About = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">About me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">{dataabout.title}</h3>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <div>
              <p>{dataabout.aboutme}</p>
            </div>
          </Col>
        </Row>
        <Row className=" sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">Educational Qualification</h3>
          </Col>
          <Col lg="7">
            <table className="table caption-top">
              <tbody>
                {worktimeline.map((data, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{data.college}</th>
                      <td>{data.course}</td>
                      <td>{data.duration}</td>
                      <td>{data.percentage}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">Skills</h3>
          </Col>
          <Col lg="7">
            <div className="skills__container">
              {skills.map((data, i) => {
                const IconComponent = iconMap[data.icon];
                return (
                  <div key={i} className="skill__item">
                    <div className="skill__icon">
                      {IconComponent && <IconComponent />}
                    </div>
                    <div className="skill__content">
                      <h4 className="skill__name">{data.name}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lang="5">
            <h3 className="color_sec py-4">Intrests</h3>
          </Col>
          <Col lg="7">
            {services.map((data, i) => {
              return (
                <div className="service_ py-4" key={i}>
                  <h5 className="service__title">{data.title}</h5>
                  <p className="service_desc">{data.description}</p>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
