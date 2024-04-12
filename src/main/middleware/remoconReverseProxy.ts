import path from "path";

import express from "express";

function remoconReverseProxy() {
  return express.static(path.join(__dirname, "..", "remocon"));
}

export default remoconReverseProxy;
