import { useForm, Controller } from 'react-hook-form';
import FeildInput from '~/components/Form/components/FeildInput/FeildInput';
function Test() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const handleClick = (data) => {
        console.log(data);
    };
    return (
        <div>
            <h1 style={errors.name && { color: 'red' }}>hi</h1>
            <Controller
                control={control}
                name="name"
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FeildInput
                        error={errors.name}
                        type="file"
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        name="Thanh Huy"
                        id="firstName"
                    />
                )}
            />
            <button onClick={handleSubmit(handleClick)}>Shit</button>
        </div>
    );
}

export default Test;
