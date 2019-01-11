class Cookie {

    public get(cname: string) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let c of ca) {
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return undefined;
    }

    public set(cname: string, cvalue: string) {
        const d = new Date();
        d.setTime(d.getTime() + (350 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        return true;
    }
        public remove(cname: string, cvalue: string = "remove") {
        const d = new Date();
        d.setTime(d.getTime() - (350 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        return true;
    }
}

export default Cookie;