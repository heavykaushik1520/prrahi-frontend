import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import cloudBanner from "../../assets/images/cloud/prrahi-img-mobile-banner.png";

const CloudComponent = () => {
  const cloudRef = useRef(null);

  useEffect(() => {
    // All original JavaScript code goes here, but with React-specific changes

    // Auxiliary objects from the original code
    var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
    var cancelAnimationFrame =
      window.cancelAnimationFrame ||
      window.cancelRequestAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.mozCancelRequestAnimationFrame ||
      window.oCancelRequestAnimationFrame ||
      window.msCancelRequestAnimationFrame;

    var sqrt = Math.sqrt,
      cos = Math.cos,
      sin = Math.sin;

    function Matrix3(a) {
      this[1] = { 1: a[0], 2: a[1], 3: a[2] };
      this[2] = { 1: a[3], 2: a[4], 3: a[5] };
      this[3] = { 1: a[6], 2: a[7], 3: a[8] };
    }
    var m3p = Matrix3.prototype;
    Matrix3.Rotation = function (angle, u) {
      var sin_a = sin(angle),
        cos_a = cos(angle),
        mcos_a = 1 - cos_a,
        xy = u.x * u.y,
        xz = u.x * u.z,
        yz = u.y * u.z,
        x2 = u.x * u.x,
        y2 = u.y * u.y,
        z2 = u.z * u.z;
      return new Matrix3([
        cos_a + x2 * mcos_a,
        xy * mcos_a - u.z * sin_a,
        xz * mcos_a + u.y * sin_a,
        xy * mcos_a + u.z * sin_a,
        cos_a + y2 * mcos_a,
        yz * mcos_a - u.x * sin_a,
        xz * mcos_a - u.y * sin_a,
        yz * mcos_a + u.x * sin_a,
        cos_a + z2 * mcos_a,
      ]);
    };
    m3p.mul_v = function (v) {
      var result = [],
        i;
      for (i = 1; i <= 3; ++i) {
        result[i - 1] =
          v[0] * this[i][1] + v[1] * this[i][2] + v[2] * this[i][3];
      }
      return result;
    };
    Matrix3.rotate_pts = function (rot_m, pts) {
      var l = pts.length,
        i = l;
      while (i--) {
        pts[i] = rot_m.mul_v(pts[i]);
      }
      return pts;
    };

    function Vector3(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z || 0;
    }
    var v3p = Vector3.prototype;
    v3p.length = function () {
      var x2 = this.x * this.x,
        y2 = this.y * this.y,
        z2 = this.z * this.z;
      return sqrt(x2 + y2 + z2);
    };
    v3p.cross = function (v) {
      var x = this.y * v.z - this.z * v.y,
        y = this.z * v.x - this.x * v.z,
        z = this.x * v.y - this.y * v.x;
      return new Vector3(x, y, z);
    };
    v3p.normalized = function () {
      var l = this.length(),
        x = this.x / l,
        y = this.y / l,
        z = this.z / l;
      return new Vector3(x, y, z);
    };

    function getOffset(elem) {
      if (elem.getBoundingClientRect) {
        return getOffsetRect(elem);
      } else {
        return getOffsetSum(elem);
      }
    }

    function getOffsetSum(elem) {
      var top = 0,
        left = 0;
      while (elem) {
        top = top + parseInt(elem.offsetTop);
        left = left + parseInt(elem.offsetLeft);
        elem = elem.offsetParent;
      }
      return { top: top, left: left };
    }

    function getOffsetRect(elem) {
      var box = elem.getBoundingClientRect(),
        body = document.body,
        docElem = document.documentElement,
        scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
        scrollLeft =
          window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
        clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        top = box.top + scrollTop - clientTop,
        left = box.left + scrollLeft - clientLeft;
      return { top: top | 0, left: left | 0 };
    }

    // Default options from your original code
    const opt = {
      radius_x: 200,
      radius_y: 200,
      radius_z: 200,
      radius_stop: 0.3,
      scale_max: 1,
      scale_min: 0.5,
      scale_steps: 50,
      opacity_max: 1,
      opacity_min: 0.5,
      opacity_steps: 20,
    };

    // Replace the original document.getElementById with the ref
    const cloud = cloudRef.current;
    if (!cloud) return; // Exit if ref is not yet available

    let cloud_coord = getOffset(cloud),
      cloud_width = cloud.offsetWidth,
      cloud_height = cloud.offsetHeight,
      max_v = sqrt(cloud_width * cloud_width + cloud_height * cloud_height) / 2,
      elements = cloud.querySelectorAll(".cloud-element"),
      num_of_el = elements.length,
      el_coord = pointsOnSphere(
        num_of_el,
        opt.radius_x,
        opt.radius_y,
        opt.radius_z
      );

    var sc = {
        step: (opt.scale_max - opt.scale_min) / opt.scale_steps,
        z_step: (2 * opt.radius_z) / opt.scale_steps,
        arr: new Array(num_of_el),
      },
      op = {
        step: (opt.opacity_max - opt.opacity_min) / opt.opacity_steps,
        z_step: (2 * opt.radius_z) / opt.opacity_steps,
        arr: new Array(num_of_el),
      },
      stop = {
        x: opt.radius_stop * opt.radius_x,
        y: opt.radius_stop * opt.radius_y,
      };

    var axis = new Vector3(0, 0, 1),
      angle = 0,
      v_l = 0,
      anim_id;

    function pointsOnSphere(n, xr, yr, zr) {
      var pts = [],
        inc = Math.PI * (3 - sqrt(5)),
        off = 2 / n,
        i,
        y,
        r,
        phi;
      for (i = 0; i < n; ++i) {
        y = i * off - 1 + off / 2;
        r = sqrt(1 - y * y);
        phi = i * inc;
        pts.push([cos(phi) * r * xr, y * yr, sin(phi) * r * zr]);
      }
      return pts;
    }

    function scaling(obj, steps, min) {
      var min_z = -opt.radius_z,
        i,
        j;
      for (i = 0; i < num_of_el; ++i) {
        for (j = 0; j <= steps; ++j) {
          if (el_coord[i][2] <= min_z + j * obj.z_step) {
            obj.arr[i] = min + j * obj.step;
            break;
          }
        }
      }
    }

    function generateScale(i) {
      return "scale(" + sc.arr[i] + ")";
    }

    function generateTranslate(i) {
      var el_w2 = elements[i].offsetWidth / 2,
        el_h2 = elements[i].offsetHeight / 2,
        w2 = cloud_width / 2,
        h2 = cloud_height / 2;
      return (
        "translate3d(" +
        ((w2 + el_coord[i][0] - el_w2) | 0) +
        "px," +
        ((h2 + el_coord[i][1] - el_h2) | 0) +
        "px," +
        el_coord[i][0] +
        "px)"
      );
    }

    function setTransform(i, value) {
      var el = elements[i];
      el.style.webkitTransform = value;
      el.style.mozTransform = value;
      el.style.msTransform = value;
      el.style.oTransform = value;
      el.style.transform = value;
    }

    function setOpacity(i) {
      var el = elements[i];
      el.style.opacity = op.arr[i];
    }

    function setRequiredStyles() {
      var i = num_of_el;
      cloud.style.overflow = "hidden";
      while (i--) {
        elements[i].style.position = "absolute";
      }
    }

    function draw() {
      var i = num_of_el,
        value;
      scaling(sc, opt.scale_steps, opt.scale_min);
      scaling(op, opt.opacity_steps, opt.opacity_min);
      while (i--) {
        value = generateTranslate(i) + " " + generateScale(i);
        setTransform(i, value);
        setOpacity(i);
      }
    }

    const recount = (e) => {
      var evt = e || window.event,
        x = evt.clientX - cloud_coord.left - cloud_width / 2,
        y = evt.clientY - cloud_coord.top - cloud_height / 2,
        cursor_v = new Vector3(x, y, 0);
      v_l =
        Math.abs(x) < stop.x && Math.abs(y) < stop.y
          ? 0
          : cursor_v.length() / max_v;
      calculateAngle();
      axis = cursor_v.cross(new Vector3(0, 0, 1)).normalized();
    };

    function calculateAngle() {
      angle = (Math.PI * v_l) / 90;
    }

    function rotate() {
      var rm;
      if (angle) {
        rm = Matrix3.Rotation(angle, axis);
        // eslint-disable-next-line no-const-assign
        el_coord = Matrix3.rotate_pts(rm, el_coord);
      }
    }

    function redraw() {
      anim_id = requestAnimationFrame(redraw);
      rotate();
      draw();
    }

    function damping() {
      anim_id = requestAnimationFrame(damping);
      if (v_l > 0.01) {
        v_l *= 0.96;
        calculateAngle();
      } else {
        cancelAnimationFrame(anim_id);
      }
      rotate();
      draw();
    }

    setRequiredStyles();
    draw();

    // Attach event listeners and return a cleanup function to remove them
    cloud.addEventListener("mousemove", recount, false);
    cloud.addEventListener(
      "mouseleave",
      () => {
        cancelAnimationFrame(anim_id);
        damping();
      },
      false
    );
    cloud.addEventListener(
      "mouseenter",
      () => {
        cancelAnimationFrame(anim_id);
        redraw();
      },
      false
    );

    // Cleanup function: this runs when the component unmounts
    return () => {
      cancelAnimationFrame(anim_id);
      cloud.removeEventListener("mousemove", recount, false);
      cloud.removeEventListener("mouseleave", damping, false);
      cloud.removeEventListener("mouseenter", redraw, false);
    };
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <section className="p-0 m-0 position-relative">
      <div
        id="cl"
        className="cloud"
        ref={cloudRef}
        style={{ 
            
            backgroundImage: `url(${cloudBanner})` }}
      >
        {/* All the child elements from your HTML */}
        <div className="cloud-element">
          <Link
            to="/collection/4d399974-d3ba-46e6-92c6-f7e4766d16f4"
            style={{ color: "#FF5733" }}
          >
            Premium Vayu
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/58798e74-d591-4a07-aa7e-8c556e322fd8"
            style={{ color: "#33FF57" }}
          >
            Prarthana Sparsh
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/7bbeb601-1301-42e7-af91-0621a86ee198"
            style={{ color: "#3357FF" }}
          >
            Premium Jal
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/9a6e0b23-30b1-4c98-b651-0a9a8c637349"
            style={{ color: "#FF33A1" }}
          >
            Premium Shakti Peeth
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/985ca620-458d-4502-8b97-ca1a27df1313"
            style={{ color: "#A1FF33" }}
          >
            Aaradhya Bela
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/569eee0b-a0ac-4ec4-83b9-b73517422f8c"
            style={{ color: "#5733FF" }}
          >
            Prarthana Pineapple
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/03e52872-1239-4ab3-af8f-ff3bbfc42fb1"
            style={{ color: "#FFB533" }}
          >
            Prarthana Manthan
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to={"/collection/30f0f86e-cc06-47ce-a1d9-f0e13c9fdb0e"}
            style={{ color: "#33FFB5" }}
          >
            Prarthana Smaran
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to={"/collection/35b3e41a-abab-4a8f-87c7-6f003502af45"}
            style={{ color: "#B533FF" }}
          >
            Premium Sandal
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to={"/collection/35b3e41a-abab-4a8f-87c7-6f003502af45"}
            style={{ color: "#FF3357" }}
          >
            Premium Siddhi Vinayak
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/cf74820e-ca57-477c-a434-8375634bbfb6"
            style={{ color: "#33A1FF" }}
          >
            Prarthana Mogra
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/d9fbb820-8298-47b7-9807-558cb449967f"
            style={{ color: "#A133FF" }}
          >
            Prarthana Rajnigandha
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/cee60ca9-044a-4d0e-acac-deef2ef94489"
            style={{ color: "#FF57A1" }}
          >
            Premium 4 in 1
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/d764c428-1c99-4278-a32b-7e0f5d945db2"
            style={{ color: "#57FF33" }}
          >
            Aaradhya Rose
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/b985639f-07fe-46da-8153-71238bc90dd4"
            style={{ color: "#5733FF" }}
          >
            Aaradhya Kasturi
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/b0efade8-9c59-49ce-a6e5-a14950cf67b8"
            style={{ color: "#33A157" }}
          >
            Premium Akash
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to={"/collection/04e4ba66-31b1-4389-b5ae-6c0b55d7f3b8"}
            style={{ color: "#A15733" }}
          >
            Premium Kasturi
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to={"/collection/0467cf20-0524-4697-b59a-11113cee0a1c"}
            style={{ color: "#B5FF33" }}
          >
            Aaradhya Chandan
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/f9b0762f-b3d0-4440-aeb5-c911eb5205ff"
            style={{ color: "#33FF57" }}
          >
            Prarthana Prakriti
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/e5b4199b-85e6-464f-a8b2-aa8ba2fd9ac8"
            style={{ color: "#5733FF" }}
          >
            Premium Patchouli
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/f7f4ef04-7c5a-4936-acfe-b8e75a2e9c1b"
            style={{ color: "#33A1FF" }}
          >
            Premium Prithvi
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/ef4aaec7-d2f5-4631-8f7e-032285e238cf"
            style={{ color: "#A133FF" }}
          >
            Premium Agni
          </Link>
        </div>

        <div className="cloud-element">
          <Link
            to="/collection/dfbd66c2-3d88-49e1-8a56-53bd81dedf02"
            style={{ color: "#FF57A1" }}
          >
            Prarthana Lavender
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CloudComponent;
