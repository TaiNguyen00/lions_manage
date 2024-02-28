export const formatDateRoom = (date) => {
    if (!date) return
    const dateData = new Date(date);
    const year = dateData.getFullYear();
    const month = (dateData.getMonth() + 1).toString().padStart(2, '0');
    const day = dateData.getDate().toString().padStart(2, '0');
    const hours = dateData.getHours().toString().padStart(2, '0');
    const minutes = dateData.getMinutes().toString().padStart(2, '0');
    const seconds = dateData.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const formatDateRoomShow = (date) => {
    if (!date) return
    const dateData = new Date(date);
    const year = dateData.getFullYear();
    const month = (dateData.getMonth() + 1).toString().padStart(2, '0');
    const day = dateData.getDate().toString().padStart(2, '0');
    const hours = dateData.getHours().toString().padStart(2, '0');
    const minutes = dateData.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year}  ${hours}:${minutes}`;
};

export const formatDates = (date) => {
    if (!date) return
    const dateData = new Date(date);
    const year = dateData.getFullYear();
    const month = (dateData.getMonth() + 1).toString().padStart(2, '0');
    const day = dateData.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
};

export const formatDate = (date) => {
    if (!date) return
    const dateData = new Date(date);
    const year = dateData.getFullYear();
    const month = (dateData.getMonth() + 1).toString().padStart(2, '0');
    const day = dateData.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const formatCurrencyVND = (number) => {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return VND.format(number)
}