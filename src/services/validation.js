export default function validation(formData, setError) {
    for (const key in formData) {
        if (key === "image") {
            if (!formData[key].name) {
                setError({
                    [key]: `Please select the file!`
                })
                return true
            }
        }
        if (key != "image" && formData[key].trim().length <= 0) {
            setError({
                [key]: `Can't be empty!`,
            });
            return true;
        }
        switch (key) {
            //username validation
            case 'username':
                if (formData[key].length < 6) {
                    setError({
                        [key]: `Username is too short, atleast 6 chars required`,
                    });
                    return true;
                }
                break;
            //email validation
            case 'email': {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData[key])) {
                    setError({
                        [key]: `Please enter valid email!`,
                    });
                    return true;
                }
                break;
            }
            case 'password':
                if (formData[key].length < 8) {
                    setError({
                        [key]: `The password must be at least 8 characters!`,
                    });
                    return true;
                }
                break;
            default:
                break;
        }
    }
    return false
}