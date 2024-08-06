{
  isCurPosFetched ? (
    <StyledTrackingBtn
      onClick={() => {
        setCenterPos(curPos);
        setIsTracking(true);
      }}
    >
      {isTracking ? <SvgFilledNavigation /> : <SvgNavigation />}
    </StyledTrackingBtn>
  ) : isGeoDenied ? (
    '위치 거부됨'
  ) : (
    '현재 위치 불러오는 중'
  );
}

let watchId = null;

function startWatchingPosition() {
  if (watchId === null) {
    watchId = navigator.geolocation.watchPosition(
      function (position) {
        console.log(
          '현재 위치:',
          position.coords.latitude,
          position.coords.longitude
        );
      },
      function (error) {
        console.error('위치 추적 중 오류 발생:', error);
      }
    );
    console.log('위치 추적을 시작했습니다.');
  }
}

function stopWatchingPosition() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    console.log('위치 추적을 중지했습니다.');
  }
}

function checkGeolocationPermission() {
  navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
    if (result.state === 'granted') {
      console.log('위치 액세스가 이미 허용되어 있습니다.');
      startWatchingPosition();
    } else if (result.state === 'prompt') {
      console.log('위치 액세스 권한을 요청할 수 있습니다.');
      // 위치 권한을 요청하고 사용자 응답에 따라 처리
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log('위치 액세스가 허용되었습니다.');
          startWatchingPosition();
        },
        function (error) {
          console.log('위치 액세스가 거부되었습니다.');
          stopWatchingPosition();
        }
      );
    } else if (result.state === 'denied') {
      console.log('위치 액세스가 거부되었습니다.');
      stopWatchingPosition();
    }

    // 권한 상태 변경 감지
    result.onchange = function () {
      console.log('위치 권한 상태가 변경되었습니다:', result.state);
      if (result.state === 'granted') {
        startWatchingPosition();
      } else {
        stopWatchingPosition();
      }
    };
  });
}

// 초기 권한 상태 확인 및 위치 추적 시작/중지
checkGeolocationPermission();

navigator.permissions.query({ name: 'geolocation' }).then(result => {
  setGeoPermission(result.state);
  if (result.state === 'granted') {
    console.log('위치 액세스가 허용되어 있습니다.');
  } else if (result.state === 'prompt') {
    console.log('위치 액세스 권한을 요청할 수 있습니다.');
  } else if (result.state === 'denied') {
    console.log('위치 액세스가 거부되었습니다.');
  }
  result.onchange = function () {
    setGeoPermission(result.state);
    console.log('위치 권한 상태가 변경되었습니다:', result.state);
  };
});
