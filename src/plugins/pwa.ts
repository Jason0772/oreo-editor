window.getVersion = (version: string) => {
    const old = localStorage.frontendVersion;
    if (!old) {
        localStorage.frontendVersion = version;
    }
    if (version !== old && old) {
        onUpVersion(version);
    }
};

export function onUpVersion(code: string) {
    console.log('update ok');
    localStorage.frontendVersion = code;
    location.reload();
}

export function checkVersion() {
    try {
        const createVersionScript = document.createElement('script');
        createVersionScript.src =
            location.origin + `${import.meta.env.BASE_URL}version.js?v=${new Date().getTime()}`;
        const script = document.getElementsByTagName('script')[0];
        script.parentNode?.insertBefore(createVersionScript, script);
    } catch (err) {
        console.log(err);
    }
}
