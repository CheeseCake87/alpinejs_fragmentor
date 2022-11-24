export default function (Alpine) {
    Alpine.magic('fragmentor', (el) => subject => {
        fetch(subject).catch(error => {
            console.log(error);
        }).then((response) => {
            if (response.status === 200) {
                response.text().then((text) => {
                    el.innerHTML = text;
                });
            }
        });
    })

    Alpine.directive("fragmentor", (el, {value, modifiers, expression}) => {

        let delay_value = 0;

        if (modifiers) {
            if (modifiers.includes("delay")) {
                try {
                    delay_value = parseInt(modifiers[modifiers.indexOf("delay") + 1].replace('ms', ''));
                } catch (e) {
                    console.log(e);
                }
            }
        }

        if (value === "get") {
            setTimeout(async () => {

                fetch(expression).catch(error => {
                    console.log(error);
                }).then((response) => {
                    if (response.status === 200) {
                        response.text().then((text) => {
                            el.innerHTML = text;
                        });
                    }
                });

            }, delay_value);
        }

    });
}