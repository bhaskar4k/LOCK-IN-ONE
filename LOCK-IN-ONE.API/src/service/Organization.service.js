const RegisterOrganization = async (req, res) => {
    return res.status(200).json({ message: "Organization Registered Successfully!" });
}

export default {
    RegisterOrganization
}