class InvalidDateError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidDateError";
    }
}

class InvalidRoomNameError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidRoomNameError";
    }
}

class InvalidBookingNameError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidBookingNameError";
    }
}

class InvalidBookingEmailError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidBookingEmailError";
    }
}

class InvalidBookingPhoneError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidBookingPhoneError";
    }
}

class InvalidStatusError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidStatusError";
    }
}

// export errors
export {
    InvalidDateError,
    InvalidRoomNameError,
    InvalidBookingNameError,
    InvalidBookingEmailError,
    InvalidBookingPhoneError,
    InvalidStatusError
}
