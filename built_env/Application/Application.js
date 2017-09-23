/**
 * Created by weblinuxgame
 */

class Application
{
    constructor(config)
    {
        this.setConfig(config);
        this.init();
    }

    init()
    {

    }

    setConfig(data)
    {
        if('undefined'!==typeof data)
        {
            this.config = data;
        }
    }

    getter()
    {
        console.log(arguments);
        return true;
    }

    setter()
    {
        console.log(arguments);
    }

    components()
    {

    }

    run()
    {

    }
}

module.exports = Application ;