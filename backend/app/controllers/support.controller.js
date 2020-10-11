
exports.getSupport = async (req, res) => {

    await Role.where({ 'name': 'User' })
        .fetch({ require: true })
        .then(role => {
            console.log(role);
        });
}