function windChill(t,s) {
    return  35.74 + (0.6215 * t) - (35.75 * (s**0.16)) + ((0.4275 * t) * (s**0.16))
}