/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var vrView;

// All the scenes for the experience
var scenes = {
  classroom: {
    image: '100_0004.JPG',
    preview: '100_0004.JPG',
    hotspots: {
      whaleRight: {
        pitch: -8.3,
        yaw: 1.1,
        radius: 0.2,
        distance: 2
      },
      whaleLeft: {
        pitch: 0,
        yaw: 150,
        radius: 0.05,
        distance: 1
      },
      walrus: {
        pitch: 0,
        yaw: 170,
        radius: 0.05,
        distance: 1
      }
    }
  },
  whaleLeft: {
    image: 'whale-left.jpg',
    preview: 'whale-left-preview.jpg',
    hotspots: {
      whaleRight: {
        pitch: 0,
        yaw: 125,
        radius: 0.05,
        distance: 1
      },
      classroom: {
        pitch: 0,
        yaw: 110,
        radius: 0.05,
        distance: 1
      },
      walrus: {
        pitch: 0,
        yaw: 30,
        radius: 0.05,
        distance: 1
      }
    }
  },
  whaleRight: {
    image: 'whale-right.jpg',
    preview: 'whale-right-preview.jpg',
    hotspots: {
      classroom: {
        pitch: 0,
        yaw: 305,
        radius: 0.05,
        distance: 1
      },
      whaleLeft: {
        pitch: 0,
        yaw: 180,
        radius: 0.05,
        distance: 1
      },
      walrus: {
        pitch: 0,
        yaw: 210,
        radius: 0.05,
        distance: 1
      }
    }
  },
  walrus: {
    image: 'walrus.jpg',
    preview: 'walrus-preview.jpg',
    hotspots: {
      whaleLeft: {
        pitch: 0,
        yaw: 20,
        radius: 0.05,
        distance: 1
      },
      whaleRight: {
        pitch: 0,
        yaw: 340,
        radius: 0.05,
        distance: 1
      },
      classroom: {
        pitch: 0,
        yaw: 320,
        radius: 0.05,
        distance: 1
      }
    }
  }
};

function onLoad() {
  vrView = new VRView.Player('#vrview', {
    width: '100%',
    height: 480,
    image: 'blank.png',
    is_stereo: false,
    is_autopan_off: true
  });

  vrView.on('ready', onVRViewReady);
  vrView.on('modechange', onModeChange);
  vrView.on('click', onHotspotClick);
  vrView.on('getposition', onGetPosition);
  vrView.on('error', onVRViewError);
}

function loadScene(id) {
  console.log('loadScene', id);

  // Set the image
  vrView.setContent({
    image: scenes[id].image,
    preview: scenes[id].preview,
    is_autopan_off: true
  });

  // Unhighlight carousel items
  var carouselLinks = document.querySelectorAll('ul.carousel li a');
  for (var i = 0; i < carouselLinks.length; i++) {
    carouselLinks[i].classList.remove('current');
  }
    vrView.getPosition();
  // Highlight current carousel item
  document.querySelector('ul.carousel li a[href="#' + id + '"]')
      .classList.add('current');
}

function onVRViewReady(e) {
  console.log('onVRViewReady');

  // Create the carousel links
  var carouselItems = document.querySelectorAll('ul.carousel li a');
  for (var i = 0; i < carouselItems.length; i++) {
    var item = carouselItems[i];
    item.disabled = false;

    item.addEventListener('click', function(event) {
      event.preventDefault();
      loadScene(event.target.parentNode.getAttribute('href').substring(1));
    });
  }

  loadScene('classroom');
}

function onModeChange(e) {
  console.log('onModeChange', e.mode);
}

function onVRViewError(e) {
  console.log('Error! %s', e.message);
}

function onGetPosition(e) {
    console.log(e)
}

window.addEventListener('load', onLoad);
