import React, { Component, useState } from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, Row, Col, Card, Space, message } from "antd";
import jQuery from "jquery";

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = jQuery.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
      }
    }
  }
  return cookieValue;
}

async function postDeleteData(url = '', data = {}) {
  let csrftoken = getCookie('csrftoken');

  const formData = new FormData();
  formData.append('method', data.method);
  formData.append('keyid', data.keyid);

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    mode: 'same-origin',
    headers: {'X-CSRFToken': csrftoken,},
    body: formData
  });
  return response.json();
}

async function postData(url = '', data = {}) {
  let csrftoken = getCookie('csrftoken');

  const formData = new FormData();
  formData.append('method', data.method);
  formData.append('title', data.title);
  formData.append('memo', data.memo);
  formData.append('idx', data.idx);

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    mode: 'same-origin',
    headers: {'X-CSRFToken': csrftoken,},
    body: formData
  });
  return response.json();
}

const confirm = (kid) => {
  console.log(kid);
  postDeleteData('/task/', { method: 'delete', keyid: kid})
    .then(data => {
      if (data.success) {window.location = '/task/';}
    })
};


function Todo() {

  const tasks = []
  const 
  
  return (
    <>
    </>
  )
}
