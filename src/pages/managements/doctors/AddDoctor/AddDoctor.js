import { useForm, Controller } from 'react-hook-form';
import Input from '~/components/Form/components/Input';
import { emailRegex, phoneNumberRegex } from '~/regex';
import Select from '~/components/Form/components/Select';
import Editor from '~/components/Form/components/Editor';
import FileInput from '~/components/Form/components/FileInput';
import Button from '~/components/Button/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';

function AddDoctor({ doctor }) {
    const [hospitals, setHospital] = useState([]);
    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3030/api/hospitals').then((res) => {
            setHospital(res.data.data);
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3030/api/specialties').then((res) => {
            setSpecialties(res.data.data);
        });
    }, []);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const handleClick = (data) => {
        axios
            .post(
                'http://localhost:3030/api/doctor/create',
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    birthDay: data.birthDay,
                    specialty: data.specialty,
                    hospital: data.hospital,
                    price: data.price,
                    shortDescription: data.shortDescription,
                    description: data.description,
                    image: data.image,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            .then((res) => console.log(res.data.message));
    };

    return (
        <div>
            <h1 className="text-3xl font-bold">Thêm bác sĩ</h1>
            <div>
                <div className="flex justify-center items-center w-full my-3">
                    <Controller
                        control={control}
                        name="image"
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FileInput
                                error={errors.image}
                                onChange={onChange}
                                onBlur={onBlur}
                                selected={value}
                                name="Image"
                                id="image"
                            />
                        )}
                    />
                </div>
                <div className="grid grid-cols-2">
                    <div className="mr-2">
                        <Controller
                            control={control}
                            name="firstName"
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    error={errors.firstName}
                                    type="text"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    selected={value}
                                    name="First Name"
                                    id="firstName"
                                    placeholder="First Name..."
                                />
                            )}
                        />
                    </div>
                    <div className="ml-2">
                        <Controller
                            control={control}
                            name="lastName"
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    error={errors.lastName}
                                    type="text"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    selected={value}
                                    name="Last Name"
                                    id="lastName"
                                    placeholder="Last Name..."
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="mr-2">
                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: true,
                                pattern: {
                                    value: emailRegex,
                                    message: 'Please enter valid email !!!',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    error={errors.email}
                                    type="email"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    selected={value}
                                    name="Email"
                                    id="email"
                                    placeholder="Email..."
                                />
                            )}
                        />
                    </div>
                    <div className="ml-2">
                        <Controller
                            control={control}
                            name="phoneNumber"
                            rules={{
                                required: true,
                                pattern: {
                                    value: phoneNumberRegex,
                                    message: 'Please enter valid Phone Number !!!',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    error={errors.phoneNumber}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    selected={value}
                                    name="Phone Number"
                                    id="phoneNumber"
                                    placeholder="Phone Number..."
                                />
                            )}
                        />
                    </div>
                </div>
                <Controller
                    control={control}
                    name="birthDay"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            error={errors.birthDay}
                            type="date"
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            name="Birth Day"
                            id="birthDay"
                        />
                    )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="sm:mr-2">
                        <Controller
                            control={control}
                            name="specialty"
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Select
                                    error={errors.specialty}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    selected={value}
                                    name="Specialty"
                                    id="specialty"
                                    options={[
                                        { name: '---Chọn chuyên khoa---', value: '' },
                                        ...specialties,
                                        { name: '---Thêm chuyên khoa---', value: '/specialty/add' },
                                    ]}
                                />
                            )}
                        />
                    </div>
                    <div className="sm:ml-2">
                        <Controller
                            control={control}
                            name="hospital"
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Select
                                    error={errors.hospital}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    selected={value}
                                    name="Hospital"
                                    id="hospital"
                                    options={[
                                        { name: '---Chọn bệnh viện---', value: '' },
                                        ...hospitals,
                                        { name: '---Thêm bệnh viện---', value: '/hospital/add' },
                                    ]}
                                />
                            )}
                        />
                    </div>
                </div>
                <Controller
                    control={control}
                    name="shortDescription"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Editor
                            error={errors.shortDescription}
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            name="Short Description"
                            id="shortDescription"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="description"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Editor
                            error={errors.description}
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            name="Description"
                            id="description"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="price"
                    rules={{
                        required: true,
                    }}
                    defaultValue={200000}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            defaultValue={200000}
                            error={errors.price}
                            type="number"
                            step={50000}
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            name="Price"
                            id="price"
                        />
                    )}
                />

                <Button className="my-10" onClick={handleSubmit(handleClick)} type="primary" size="full">
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default AddDoctor;
