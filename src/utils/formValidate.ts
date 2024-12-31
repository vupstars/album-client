import type { FormInst } from "naive-ui";
import type { ShouldRuleBeApplied } from "naive-ui/es/form/src/interface";

export async function formValidate( form?: FormInst | null, shouldRuleBeApplied?: ShouldRuleBeApplied ): Promise<boolean> {
	if ( !form ) return false;
	try {
		await form.validate( undefined, shouldRuleBeApplied );
		return true;
	} catch {
		return false;
	}
}