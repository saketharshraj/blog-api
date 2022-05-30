enum Gender {
    MALE = 1,
    FEMALE = 2,
    OTHER = 3,
}

interface UserPayload {
    transid: string;
    email: string;
    otp: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    dob: Date;
    gender: Gender;
    country: string;
}

export { UserPayload };
