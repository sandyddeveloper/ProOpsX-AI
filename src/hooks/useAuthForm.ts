"use client";
import { useState } from "react";
import axios from "axios";

interface UseAuthFormProps {
    url: string;
    onSuccessRedirect?: string;
    payloadTransform?: (form: any) => any; 
    requirePasswordStrength?: boolean; 
    requireConfirmPassword?: boolean;  
}

export default function useAuthForm({
    url,
    onSuccessRedirect,
    payloadTransform,
    requirePasswordStrength = false,
    requireConfirmPassword = false,
}: UseAuthFormProps) {
    const [form, setForm] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const strongPassword = (password: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/.test(
            password
        );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        if (requirePasswordStrength && form.password && !strongPassword(form.password)) {
            setMessage(
                "Password must contain 8+ chars, uppercase, lowercase, number & special char!"
            );
            return;
        }

        if (
            requireConfirmPassword &&
            form.password &&
            form.confirmPassword &&
            form.password !== form.confirmPassword
        ) {
            setMessage("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const payload = payloadTransform ? payloadTransform(form) : form;
            await axios.post(url, payload, { withCredentials: true });

            setMessage("Success! Welcome...");
            if (onSuccessRedirect) {
                setTimeout(() => (window.location.href = onSuccessRedirect), 1200);
            }
        } catch (error: any) {
            setMessage(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return { form, setForm, handleChange, handleSubmit, loading, message };
}
