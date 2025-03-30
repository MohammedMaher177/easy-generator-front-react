import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { useAppDispatch, useAppSelector } from '@/store';
import Joi from 'joi';
import { loginDipatch } from '@/store/slices/auth/actions';
import { Form, Formik } from 'formik';
import { validateForm } from '@/util/util';
import InputWRapper from '@/components/inputs/InputWRapper';
import { ILogin, InputType } from '@/util/interfaces';
import { useEffect } from 'react';
import { resetErrors } from '@/store/slices/auth/slice';
type Props = {};

const inputs: { name: string; type?: InputType }[] = [
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
];

const schema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.empty': 'Email is required.',
            'string.email': 'Please enter a valid email address.',
        }),
    password: Joi.string().min(4).required().messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 6 characters long.',
    }),
});

const initialValues: ILogin = { email: '', password: '' };

export default function LoginForm({}: Props) {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { errors } = useAppSelector(({ auth }) => auth.actions);

    const handleFormSubmit = async (values: ILogin) => {
        const { type } = await dispatch(loginDipatch(values))

        if (type.includes('fulfilled')) navigate('/');
    };

    useEffect(() => {
       dispatch(resetErrors())
    }, []);


    return (
        <div>
            <div className={`absolute inset-0 ${styles.bg}`}></div>
            <div className={`relative flex min-h-screen items-center justify-center px-6 py-10 dark:bg-[#060818] sm:px-16`}>
                <div className="relative w-full max-w-[870px] rounded-md p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[558px] py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign In</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            {errors.length ? (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <ul className="list-disc pl-5">
                                        {errors.map((error: string, index: number) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                ''
                            )}
                            <Formik
                                initialValues={initialValues}
                                initialTouched={{ email: true, password: true }}
                                validate={(v) => validateForm(v, schema)}
                                onSubmit={handleFormSubmit}
                                validateOnChange={true}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        {inputs.map((input) => (
                                            <InputWRapper key={input.name} name={input.name} type={input.type} />
                                        ))}
                                        <button
                                            disabled={!!(Object.keys(errors).length || !Object.keys(touched).length)}
                                            type="submit"
                                            className={`btn btn-gradient h-12 cursor-pointer rounded-lg !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] ${styles.bg}`}
                                        >
                                            Login
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                            <div className="mt-6 text-center text-sm text-white-dark">
                                <span>Don't have an account?</span>{' '}
                                <Link to="/auth/register" className="inline-block font-semibold text-primary transition duration-200 hover:underline hover:scale-105">
                                    Create one now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
