import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import { UserPayload } from '../UserPayload';
import axios from 'axios';

const VerifyOtp = () => async (context: HookContext) => {
    const data: UserPayload = context.data;
    const { app } = context;
    const { transid, email, otp } = data;
    const verifyEmailPayload = {
        email,
        otp,
        transid,
    };
    try {
        const response = await axios({
            url: app.get('emailAuthenticator') + '/api/v1/verify-email',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(verifyEmailPayload),
            validateStatus: () => true,
        });
        if (response.status !== 200) throw new BadRequest('Wrong OTP');
    } catch (error: any) {
        throw new BadRequest('OTP is expired or invalid');
    }
};

export default VerifyOtp;
