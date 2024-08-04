useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      new naver.maps.Map('map', mapOptions);
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const mapScript = document.createElement('script');
      mapScript.onload = () => initMap();
      mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=3rrgj4rkdf`;
      document.head.appendChild(mapScript);
    }
  }, []);

<head>
        <Script
          strategy="beforeInteractive" //"beforeInteractive"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=3rrgj4rkdf`}
        ></Script>
      </head>

      <div
        ref={mapRef}
        id="map"
        style={{ width: '100%', height: '500px' }}
      ></div>

      position: fixed;
      width: 80%;
      height: 90%;
      left: 0;
      top: 0;
      background: rgba(51, 51, 51, 0.7);
      z-index: 10;

      <h1>NowPlace</h1>
      <div style={{ width: '1000px', height: '500px' }}>
        <KakaoMap />
      </div>