export function ValidateZip(zip) {
    let errors = []
    if (zip == null) {
        errors.push("Please enter a five digit Zip code")
        return errors
    }
    if (zip.length != 5) {
        errors.push("Zip must be length 5")
    }
    if (!/^\d+$/.test(zip)) {
        errors.push("Zip must be numbers only")
    }
    return errors
}