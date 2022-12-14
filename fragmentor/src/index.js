(() => {
    function src_default(Alpine) {

        Alpine.magic('fragmentor', (el) => (uri, ref) => {
            if (!ref) {
                fetch(uri).catch(error => {
                    console.log(error);
                }).then((response) => {
                    if (response.status === 200) {
                        response.text().then((text) => {
                            el.innerHTML = text;
                        });
                    }
                });
            } else {
                fetch(uri).catch(error => {
                    console.log(error);
                }).then((response) => {
                    if (response.status === 200) {
                        response.text().then((text) => {
                            ref.innerHTML = text;
                        });
                    }
                });
            }
        })

        Alpine.magic('fragmentor_markup', (el) => (markup, ref) => {
            if (!ref) {
                el.innerHTML = markup;
            } else {
                ref.innerHTML = markup;
            }
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

    document.addEventListener("alpine:init", () => {
        window.Alpine.plugin(src_default);
    });
})();