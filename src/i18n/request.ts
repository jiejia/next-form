import {getRequestConfig} from 'next-intl/server';
// import {getOptionByArgs} from "@/app/lib/data-service"

export default getRequestConfig(async () => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.

    // default language
    const locale = 'en-us';

    // // get language setting from database
    // const option = await getOptionByArgs({
    //     where: {
    //         name: "general_settings"
    //     },
    // })
    // if (option && option.value && option.value.default_language) {
    //      locale = option.value.default_language;
    // }

    return {
        locale,
        messages: (await import(`@/locales/${locale}.json`)).default
    };
});