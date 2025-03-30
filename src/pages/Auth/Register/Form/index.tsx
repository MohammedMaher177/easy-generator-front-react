import { Link, useNavigate } from 'react-router-dom';
import styles from './register.module.css';
import { useAppDispatch, useAppSelector } from '@/store';
import Joi from 'joi';
import { registerDispatch } from '@/store/slices/auth/actions';
import { Form, Formik } from 'formik';
import { validateForm } from '@/util/util';
import InputWRapper from '@/components/inputs/InputWRapper';
import { IRegister, InputType } from '@/util/interfaces';
type Props = {};

const inputs: { name: string; type?: InputType }[] = [{ name: 'name' }, { name: 'email', type: 'email' }, { name: 'password', type: 'password' }];

const schema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address',
        }),

    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must include at least one letter, one number, and one special character',
        }),

    name: Joi.string().min(3).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters long',
    }),
});

const initialValues: IRegister = { email: 'admin@easygenerator.com', password: 'Milo@2024!', name: 'Admin' };

export default function RegisterForm({}: Props) {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { errors } = useAppSelector(({ auth }) => auth.actions);

    const handleFormSubmit = async (values: IRegister) => {
        const { type } = await dispatch(registerDispatch(values));

        if (type.includes('fulfilled')) navigate('/');
    };

    return (
        <div>
            <div className={`absolute inset-0 ${styles.bg}`}></div>
            <div className={`relative flex min-h-screen items-center justify-center px-6 py-10 dark:bg-[#060818] sm:px-16`}>
                <div className="relative w-full max-w-[870px] rounded-md p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[558px] py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Register</h1>
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
                                            className={`btn btn-gradient rounded-lg h-12 !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] cursor-pointer ${styles.bg}`}
                                        >
                                            Register
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                            <div className="mt-6 text-center text-sm">
                                <span className="text-white-dark">Already have an account?</span>{' '}
                                <Link to="/auth/login" className="inline-block font-semibold text-primary transition duration-200 hover:underline hover:scale-105">
                                    Sign in here
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
