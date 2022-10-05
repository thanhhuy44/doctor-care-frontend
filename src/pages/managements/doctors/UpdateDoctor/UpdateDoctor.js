import { useForm, Controller } from 'react-hook-form';
import Input from '~/components/Form/components/Input';
import { emailRegex, phoneNumberRegex } from '~/regex';
import Select from '~/components/Form/components/Select';
import Editor from '~/components/Form/components/Editor';
import FileInput from '~/components/Form/components/FileInput';
import Button from '~/components/Button/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateDoctor() {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
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

    useEffect(() => {
        axios.get(`http://localhost:3030/api/doctor/${params.id}`).then((res) => {
            setData(res.data.data);
            setIsLoading(false);
        });
    }, []);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const handleClick = (data) => {
        console.log(data.specialty, data.hospital);
        axios
            .post(
                `http://localhost:3030/api/doctor/update/${params.id}`,
                { ...data, birth: data.birthDay },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            .then((res) => {
                alert(res.data.message);
                navigate('/admin/doctors');
            });
    };
    if (isLoading) {
        <h1>is loading</h1>;
    } else {
        return (
            <div className="mx-auto max-w-[1000px]">
                <h1 className="text-3xl font-bold text-center md:text-left">Thêm bác sĩ</h1>
                <div>
                    <div className="flex justify-center items-center w-full my-3">
                        <Controller
                            control={control}
                            name="image"
                            rules={{
                                required: true,
                            }}
                            defaultValue={data.image}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FileInput
                                    defaultValue={data.image}
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
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="md:mr-2">
                            <Controller
                                control={control}
                                name="firstName"
                                rules={{
                                    required: true,
                                }}
                                defaultValue={data.firstName}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        defaultValue={data.firstName}
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
                        <div className="md:ml-2">
                            <Controller
                                control={control}
                                name="lastName"
                                rules={{
                                    required: true,
                                }}
                                defaultValue={data.lastName}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        defaultValue={data.lastName}
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
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="md:mr-2">
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
                                defaultValue={data.email}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        defaultValue={data.email}
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
                        <div className="md:ml-2">
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
                                defaultValue={data.phoneNumber}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        defaultValue={data.phoneNumber}
                                        error={errors.phoneNumber}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        selected={value}
                                        name="Số điện thoại"
                                        id="phoneNumber"
                                        placeholder="Số điện thoại..."
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div>
                        <Controller
                            control={control}
                            name="birthDay"
                            rules={{
                                required: true,
                            }}
                            defaultValue={`${new Date(data.birth).getFullYear()}-${
                                new Date(data.birth).getMonth() < 10
                                    ? `0${new Date(data.birth).getMonth()}`
                                    : new Date(data.birth).getMonth()
                            }-${
                                new Date(data.birth).getDate() < 10
                                    ? `0${new Date(data.birth).getDate()}`
                                    : new Date(data.birth).getDate()
                            }`}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    defaultValue={`${new Date(data.birth).getFullYear()}-${
                                        new Date(data.birth).getMonth() < 10
                                            ? `0${new Date(data.birth).getMonth()}`
                                            : new Date(data.birth).getMonth()
                                    }-${
                                        new Date(data.birth).getDate() < 10
                                            ? `0${new Date(data.birth).getDate()}`
                                            : new Date(data.birth).getDate()
                                    }`}
                                    error={errors.birthDay}
                                    type="date"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    selected={value}
                                    name="Ngày sinh"
                                    id="birthDay"
                                />
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="md:mr-2">
                            <Controller
                                control={control}
                                name="specialty"
                                rules={{
                                    required: true,
                                }}
                                defaultValue={data.specialty._id}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Select
                                        defaultValue={data.specialty._id}
                                        error={errors.specialty}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        selected={value}
                                        name="Chuyên khoa"
                                        id="specialty"
                                        options={[
                                            ...specialties,
                                            { name: '---Thêm chuyên khoa---', value: '/specialty/add' },
                                        ]}
                                    />
                                )}
                            />
                        </div>
                        <div className="md:ml-2">
                            <Controller
                                control={control}
                                name="hospital"
                                rules={{
                                    required: true,
                                }}
                                defaultValue={data.hospital._id}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Select
                                        defaultValue={data.hospital._id}
                                        error={errors.hospital}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        selected={value}
                                        name="Bệnh viện"
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
                        defaultValue={data.shortDescription}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Editor
                                defaultValue={data.shortDescription}
                                error={errors.shortDescription}
                                onChange={onChange}
                                onBlur={onBlur}
                                selected={value}
                                name="Giới thiệu ngắn"
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
                        defaultValue={data.description}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Editor
                                defaultValue={data.description}
                                error={errors.description}
                                onChange={onChange}
                                onBlur={onBlur}
                                selected={value}
                                name="Thông tin chi tiết"
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
                        defaultValue={data.price}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                defaultValue={data.price}
                                error={errors.price}
                                type="number"
                                step={50000}
                                onChange={onChange}
                                onBlur={onBlur}
                                selected={value}
                                name="Giá"
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
}

export default UpdateDoctor;
