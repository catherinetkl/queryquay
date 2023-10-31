import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();
    const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

    useEffect(() => {
        const storedLanguage = localStorage.getItem('selectedLanguage');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('selectedLanguage', lng);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown); // Toggle dropdown visibility
    };

    return (
        <div className="language-selector">
            <div className="dropdown">
                <button className="btn btn-link dropdown-toggle" onClick={toggleDropdown}>
                    🌐
                </button>
                {showDropdown && (
                    <select
                        onChange={(e) => {
                            changeLanguage(e.target.value);
                            toggleDropdown(); // Close the dropdown on language selection
                        }}
                        value={i18n.language}
                    >
                        <option value="en">󠁧󠁢󠁥󠁮󠁧󠁿󠁧󠁢󠁥󠁮󠁧󠁿🇺🇸 English</option>
                        <option value="zh">🇨🇳 中文</option>
                        <option value="ms">🇲🇾 Bahasa Melayu</option>
                        <option value="fr">🇫🇷 Français</option>
                        <option value="th">🇹🇭 ไทย</option>
                    </select>
                )}
            </div>
        </div>
    );
};

export default LanguageSelector;
